// A mock function to mimic making an async post of data
export function sumbitResponse(data = {}) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ data });
    }, 1500)
  );
}
