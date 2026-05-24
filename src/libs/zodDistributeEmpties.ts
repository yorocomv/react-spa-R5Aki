import { z } from 'zod';

export const isEmpty = (val: unknown) => val === null || val === undefined || val === '';

export const zOptString = z.preprocess(v => (isEmpty(v) ? undefined : v), z.string().optional());
export const zOptPosNumber = z.preprocess(v => (isEmpty(v) ? undefined : v), z.coerce.number().positive().optional());
export const zOptPosInteger = z.preprocess(v => (isEmpty(v) ? undefined : v), z.coerce.number().int().positive().optional());
export const zOptDate = z.preprocess(v => (isEmpty(v) ? undefined : v), z.coerce.date().optional());

export const zNullString = z.preprocess(v => (isEmpty(v) ? null : v), z.string().nullable());
export const zNullPosNumber = z.preprocess(v => (isEmpty(v) ? null : v), z.coerce.number().positive().nullable());
export const zNullPosInteger = z.preprocess(v => (isEmpty(v) ? null : v), z.coerce.number().int().positive().nullable());
export const zNullDate = z.preprocess(v => (isEmpty(v) ? null : v), z.coerce.date().nullable());
