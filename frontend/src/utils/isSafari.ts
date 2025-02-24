// External

// Local

const isSafari = (): boolean => {
  return /^((?!chrome|android).)*safari/i.test(
    `${navigator?.userAgent || ""}`.toLowerCase()
  );
};

export { isSafari };
