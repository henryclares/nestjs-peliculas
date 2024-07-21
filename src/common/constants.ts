export const Status = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
} as const;

export type TState = (typeof Status)[keyof typeof Status];

export const SALT_ROUND = 10;

export const USUARIO_SISTEMA = '1';
