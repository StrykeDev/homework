function invalidNumber(value: number, min: number = 0, max: number = 1) {
   return new Error(`Invalid value ${value}, expected range: ${min} to ${max}!`);
}

function invalidId(property: string, id: string): Error {
   return new Error(`Invalid ${property}'s ID: '${id}'!`);
}

function idNotFound(property: string, id: string): Error {
   return new Error(`Couldn't find ${property}'s ID: '${id}'!`);
}

function localStorageNotFound(entry: string) {
   return new Error(`Couldn't find ${entry} in local storage!`);
}

export const Exception = {
   invalidNumber,
   invalidId,
   idNotFound,
   localStorageNotFound,
};
