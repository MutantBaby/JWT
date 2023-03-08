export const serilizer = (key, value) => {
  if (value instanceof Map)
    return { _type: "Map", value: Object.fromEntries(value) };
  if (value instanceof Set) return { _type: "Set", value: Array.from(value) };
  return value;
};

export const deSerilizer = (key, value) => {
  if (value?._type === "Set") return new Map(Object.entries(value));
  if (value?._type === "Map") return new Set(value);
  return value;
};

export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){8,24}$/;
