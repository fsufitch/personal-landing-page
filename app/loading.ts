import { readonly, ref } from 'vue';

type LoadingStep = 'not-started' | 'loading' | 'success' | 'error';

export interface LoadingState {
    step: LoadingStep;
    message?: string;
}

export type OnLoadingFunc = (state: LoadingState) => void;

export const useLoading = () => {
    const $state = ref<LoadingState>({ step: 'not-started' });

    const setState: OnLoadingFunc = (newState: LoadingState): void => {
        $state.value = newState;
    };
    const state = readonly($state);

    return { state, setState };
};
