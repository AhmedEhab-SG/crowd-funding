const formatClasses = (className?: string): string =>
  className ? className.replace(/\s+/g, " ").trim() : "";

export { formatClasses };
