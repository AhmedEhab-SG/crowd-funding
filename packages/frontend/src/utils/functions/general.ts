import { cloneElement } from "react";

const addAttributesToReactNode = (
  element: JSX.Element,
  attributes?: React.HTMLAttributes<HTMLOrSVGElement>
) => cloneElement(element, attributes);

const calcImgTranslateY = (
  imgHeight: number,
  imgWidth: number,
  imgContainerHeight: number,
  imgContainerWidth: number
): number => {
  const aspectRatio = imgHeight / imgWidth;
  const calculatedImgHeight = imgContainerWidth * aspectRatio;

  return (
    ((calculatedImgHeight - imgContainerHeight) / calculatedImgHeight) * 100
  );
};

const pascalCase = (fullString: string): string =>
  fullString
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const trim = (className: string): string =>
  className.replace(/\s+/g, " ").trim();

const convertFileListToBase64 = (fileList: FileList): Promise<string[]> => {
  const base64Promises = Array.from(fileList).map(
    (file) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      })
  );
  return Promise.all(base64Promises);
};

const base64ToFiles = (
  base64Strings: string[],
  fileNames: string[]
): File[] => {
  return base64Strings.map((base64String, index) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileNames[index], { type: mime });
  });
};

const filesArrayToFileList = (filesArray: File[]): FileList | File[] => {
  if (typeof DataTransfer === "undefined") return filesArray;

  const dataTransfer = new DataTransfer();
  filesArray.forEach((file) => {
    dataTransfer.items.add(file);
  });
  return dataTransfer.files;
};

const getCommonKeys = (list: object[]) => [
  ...new Set(
    list.reduce((acc: string[], curr) => [...acc, ...Object.keys(curr)], [])
  ),
];

const addSpaceBeforeCapitalLetter = (string: string): string =>
  string.replace(/([A-Z])/g, " $1").trim();

const isRouteFound = (
  routes: string[],
  pathname: string,
  {
    dynamicRoutes = [],
    regExp = {
      pattern: `(?:/[^/?]+(?:\\?[^/]+)?)?$`,
    },
  }: {
    dynamicRoutes?: string[];
    regExp?: { pattern?: RegExp | string; flags?: string };
  } = {}
) =>
  routes.some((route) => route === pathname) ||
  dynamicRoutes.some((route) =>
    new RegExp(`^${route}${regExp.pattern}`, regExp.flags).test(pathname)
  );

export {
  addAttributesToReactNode,
  calcImgTranslateY,
  pascalCase,
  trim,
  base64ToFiles,
  convertFileListToBase64,
  filesArrayToFileList,
  getCommonKeys,
  addSpaceBeforeCapitalLetter,
  isRouteFound,
};
