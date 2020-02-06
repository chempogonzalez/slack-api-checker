/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @interface ObjectType
 *
 * @description Interface for specification of the object details
 *
 * @property {object | string | number | []} key - key param of object
 *
 */
export interface ObjectType {
  [key: string]: any | any[];
}
