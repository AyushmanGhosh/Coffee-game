// Centralized player state management for scene transitions and interactions
export interface PlayerState {
  x: number;
  y: number;
  velocityX?: number;
  velocityY?: number;
  isBoosted?: boolean;
  [key: string]: any;
}

const state: PlayerState = {
  x: 0,
  y: 0,
  velocityX: 0,
  velocityY: 0,
  isBoosted: false
};

export function setPlayerState(newState: Partial<PlayerState>) {
  Object.assign(state, newState);
}

export function getPlayerState(): PlayerState {
  return { ...state };
}
