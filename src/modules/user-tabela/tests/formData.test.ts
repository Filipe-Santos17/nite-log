import { test, describe, expect } from "vitest";
import formatDate from "../utils/formatDate";

describe("Test the format Date function", () => {
  test("should not be possible create a date with a number", () => {
    const data = formatDate(989, "date");
    expect(data).toBe("-");
  });

  test("should be format a date day correctly", () => {
    const isoData = "2023-06-15T14:30:00Z";
    const formatData = formatDate(isoData, "date");
    expect(formatData).toBe("6/15/2023");
  });

  test("should be format a current date day correctly", () => {
    const date = new Date();
    const isoData = date.toISOString();
    const currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    const formatData = formatDate(isoData, "date");
    console.log(isoData,formatData, currentDate)
    expect(formatData).toBe(currentDate);
  });

  //getDay, month and year

  test("should return a string", () => {
    const currentDateIso = new Date().toISOString();
    expect(formatDate(currentDateIso, "date")).toBeTypeOf("string");
    expect(formatDate(currentDateIso, "hour")).toBeTypeOf("string");
  });
});
