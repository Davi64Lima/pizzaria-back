export class NotFoundError extends Error {
  constructor(
    entity: string,
    key: string | number,
    attribute: string | number = 'id',
  ) {
    super(`${entity} with ${attribute} "${key}" not found.`);
  }
}
