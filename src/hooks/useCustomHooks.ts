import React from 'react';

export const useCustomHooks = () => {
  function matchExistedKeys<T>(fullDto: Record<string, any>, targetDto: T): T {
    let matched = Object?.keys(targetDto)?.reduce((acc, key) => {
      if (key in fullDto) {
        acc[key] = fullDto[key];
      }
      return acc;
    }, {} as T);
    return { ...targetDto, ...matched } as T;
  }

  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    // Remove the hash (#) if it's present
    hex = hex.replace(/^#/, '');

    // Parse the hexadecimal value to RGB
    var bigint = parseInt(hex, 16);

    // Extract the red, green, and blue components
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    // Return the RGB values as an object
    return { r: r, g: g, b: b };
  }

  function hexToRgbaString(hex: string, alpha: number): string {
    // Remove the hash (#) if it's present
    hex = hex?.replace(/^#/, '');

    // Parse the hexadecimal value to RGB
    var bigint = parseInt(hex, 16);

    // Extract the red, green, and blue components
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    // Return the RGBA string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // use Timer Fn

  const timer = React.useRef<null | NodeJS.Timeout>(null);
  const useTimerFn = (fn: () => void, timerValue?: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fn();
    }, timerValue || 3000);
  };

  // Find ById
  const findByID = <T>(array: T[], id: number | string) => {
    return array.find((item) => item['id'] == id) as T;
  };

  // USe Search
  const useSearch = (array: any[], filterField: string, value: string) => {
    const regex = new RegExp(`${value}`, 'i');
    if (filterField && value) {
      return array.filter((item) => item[filterField].toString().match(regex));
    } else {
      return array || [];
    }
  };

  const getSearchParams = (params: URLSearchParams): Record<any, any> => {
    let paramsList = {};
    params.forEach((item, key) => {
      if (item == 'null' || item == '' || !item) return;
      else paramsList[key] = item;
    });
    return paramsList;
  };

  const ConvertToSearchParams = (data: Record<any, any>) => {
    let paramsList = {};
    Object.keys(data).forEach((key) => {
      if (data[key] == 'null' || data[key] == '' || !data[key]) return;
      // paramsList[key] = null;
      else paramsList[key] = String(data[key]);
    });
    return paramsList;
  };

  const isValidDate = (date: string | Date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  };

  return {
    matchExistedKeys,
    hexToRgb,
    hexToRgbaString,
    useTimerFn,
    findByID,
    useSearch,
    getSearchParams,
    ConvertToSearchParams,
    isValidDate,
  };
};
