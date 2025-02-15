import {
  ACCESS_TOKEN,
  RESTAURANT,
  REVIEWS,
} from '@fixtures';

import reducer from './reducer';

import {
  setRegions,
  setCategories,
  setRestaurants,
  setRestaurant,
  selectRegion,
  selectCategory,
  changeLoginField,
  setAccessToken,
  changeReviewField,
  clearReviewFields,
  setReviews,
  clearLoginFields,
  setLoginError,
} from './actions';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      regions: [],
      categories: [],
      restaurants: [],
      restaurant: null,
      selectedRegion: null,
      selectedCategory: null,
      loginFields: {
        email: '',
        password: '',
      },
      reviewFields: {
        score: '',
        description: '',
      },
      accessToken: '',
      loginError: null,
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setRegions', () => {
    it('changes regions', () => {
      const initialState = {
        regions: [],
      };

      const regions = [{ id: 1, name: '서울' }];

      const state = reducer(initialState, setRegions(regions));

      expect(state.regions).toHaveLength(1);
    });
  });

  describe('setCategories', () => {
    it('changes categories', () => {
      const initialState = {
        categories: [],
      };

      const categories = [{ id: 1, name: '한식' }];

      const state = reducer(initialState, setCategories(categories));

      expect(state.categories).toHaveLength(1);
    });
  });

  describe('setRestaurants', () => {
    it('changes restaurants', () => {
      const initialState = {
        restaurants: [],
      };

      const restaurants = [{ id: 1, name: '마법사주방' }];

      const state = reducer(initialState, setRestaurants(restaurants));

      expect(state.restaurants).toHaveLength(1);
    });
  });

  describe('setRestaurant', () => {
    it('changes restaurant', () => {
      const initialState = {
        restaurant: null,
      };

      const restaurant = { id: 1, name: '마법사주방' };

      const state = reducer(initialState, setRestaurant(restaurant));

      expect(state.restaurant.id).toBe(1);
      expect(state.restaurant.name).toBe('마법사주방');
    });
  });

  describe('setReviews', () => {
    context('with restaurant', () => {
      const initialState = {
        restaurant: RESTAURANT,
      };

      it('changes reviews of the restaurant', () => {
        const state = reducer(initialState, setReviews(REVIEWS));

        expect(state.restaurant.reviews).toEqual(REVIEWS);
      });
    });

    context('without restaurant', () => {
      const initialState = {
        restaurant: null,
      };

      it("doesn't anything", () => {
        const state = reducer(initialState, setReviews(REVIEWS));

        expect(state).toEqual(initialState);
      });
    });
  });

  describe('selectRegion', () => {
    it('changes selected region', () => {
      const initialState = {
        regions: [{ id: 1, name: '서울' }],
        selectedRegion: null,
      };

      const state = reducer(initialState, selectRegion(1));

      expect(state.selectedRegion).toEqual({
        id: 1,
        name: '서울',
      });
    });
  });

  describe('selectCategory', () => {
    it('changes selected category', () => {
      const initialState = {
        categories: [{ id: 1, name: '한식' }],
        selectedCategory: null,
      };

      const state = reducer(initialState, selectCategory(1));

      expect(state.selectedCategory).toEqual({
        id: 1,
        name: '한식',
      });
    });
  });

  describe('changeLoginField', () => {
    const initialState = {
      loginFields: {
        email: '',
        password: '',
      },
    };

    it('changes login field', () => {
      const fields = [
        { name: 'email', value: 'abc@test.com' },
        { name: 'password', value: 'password123' },
      ];

      fields.forEach(({ name, value }) => {
        const state = reducer(
          initialState,
          changeLoginField({ name, value }),
        );

        expect(state.loginFields[name]).toBe(value);
      });
    });

    context('with invalid fields', () => {
      it("doesn't anything", () => {
        const state = reducer(
          initialState,
          changeLoginField({
            name: 'nickname',
            value: '코드숨',
          }),
        );

        expect(state).toEqual(initialState);
      });
    });
  });

  describe('clearLoginFields', () => {
    const initialState = {
      loginFields: {
        email: 'abc@test.com',
        password: 'password',
      },
    };

    it('clears login fields', () => {
      const state = reducer(
        initialState,
        clearLoginFields(),
      );

      expect(state.loginFields).toEqual({
        email: '',
        password: '',
      });
    });
  });

  describe('changeReviewField', () => {
    const initialState = {
      reviewFields: {
        score: '',
        description: '',
      },
    };

    it('changes review field', () => {
      const fields = [
        { name: 'score', value: '9' },
        { name: 'description', value: '정말 맛있어요!' },
      ];

      fields.forEach(({ name, value }) => {
        const state = reducer(
          initialState,
          changeReviewField({ name, value }),
        );

        expect(state.reviewFields[name]).toBe(value);
      });
    });

    context('with invalid fields', () => {
      it("doesn't anything", () => {
        const state = reducer(
          initialState,
          changeReviewField({
            name: 'complaint',
            value: '불편해요!',
          }),
        );

        expect(state).toEqual(initialState);
      });
    });
  });

  describe('clearReviewFields', () => {
    const initialState = {
      reviewFields: {
        score: '9',
        description: '맛있어요!',
      },
    };

    it('clears review fields', () => {
      const state = reducer(
        initialState,
        clearReviewFields(),
      );

      expect(state.reviewFields).toEqual({
        score: '',
        description: '',
      });
    });
  });

  describe('setAccessToken', () => {
    const initialState = {
      accessToken: '',
    };

    it('changes access token', () => {
      const state = reducer(
        initialState,
        setAccessToken(ACCESS_TOKEN),
      );

      expect(state.accessToken).toBe(ACCESS_TOKEN);
    });
  });

  describe('setLoginError', () => {
    const initialState = {
      loginError: null,
    };

    it('changes login error', () => {
      const errorMessage = '존재하지 않는 계정입니다.';

      const state = reducer(
        initialState,
        setLoginError(errorMessage),
      );

      expect(state.loginError).toBe(errorMessage);
    });
  });
});
