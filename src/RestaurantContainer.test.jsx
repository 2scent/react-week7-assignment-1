import { fireEvent, render } from "@testing-library/react";

import { useDispatch, useSelector } from "react-redux";

import RestaurantContainer from "./RestaurantContainer";

describe("RestaurantContainer", () => {
  const dispatch = jest.fn();

  function renderRestaurantContainer() {
    return render(<RestaurantContainer restaurantId='1' />);
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) =>
      selector({
        restaurant: given.restaurant,
        reviewField: {
          score: "",
          description: "",
        },
      })
    );
  });

  it("dispatches action", () => {
    renderRestaurantContainer();

    expect(dispatch).toBeCalled();
  });

  context("with restaurant", () => {
    given("restaurant", () => ({
      id: 1,
      name: "마법사주방",
      address: "서울시 강남구",
    }));

    it("renders name and address", () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent("마법사주방");
      expect(container).toHaveTextContent("서울시");
    });
  });

  context("without restaurant", () => {
    given("restaurant", () => null);

    it("renders loading", () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent("Loading");
    });
  });

  // review test
  it("renders review write Form", () => {
    const { queryByLabelText, getByRole } = renderRestaurantContainer();

    expect(queryByLabelText("평점")).not.toBeNull();
    expect(queryByLabelText("리뷰내용")).not.toBeNull();
    expect(getByRole("button", { name: "리뷰 남기기" }));
  });

  it("change review wirte Form", () => {
    const { queryByLabelText } = renderRestaurantContainer();
    const controls = [
      { label: "평점", name: "평점", value: "5" },
      { label: "리뷰내용", name: "리뷰내용", value: "정말 좋았어요" },
    ];

    controls.forEach((control) => {
      const { label, name, value } = control;
      const input = queryByLabelText(label);

      fireEvent.change(input, { target: { value } });

      expect(dispatch).toBeCalledWith(changeReviewField({ name, value }));
    });
  });

  it("review write Form submitted", () => {
    const { getByRole } = renderRestaurantContainer();

    fireEvent.click(getByRole("button", { name: "리뷰 남기기" }));

    expect(dispatch).toBeCalled();
  });
});
