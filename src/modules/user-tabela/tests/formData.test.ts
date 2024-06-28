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
    expect(formatData).toBe("15/06/2023");
  });

  test("should be format a current date day correctly", () => {
    const date = new Date();
    const isoData = date.toISOString();

    const month = date.getMonth() + 1; //0 is January
    const currentDate = `${date.getDate()}/${
      month >= 10 ? month : `0${month}`
    }/${date.getFullYear()}`;

    const formatData = formatDate(isoData, "date");
    expect(formatData).toBe(currentDate);
  });

  test("should return a string", () => {
    const currentDateIso = new Date().toISOString();
    expect(formatDate(currentDateIso, "date")).toBeTypeOf("string");
    expect(formatDate(currentDateIso, "hour")).toBeTypeOf("string");
  });

  test("should not write a date invalide", () => {
    const isoDataInvalide = "2024-02-31T12:30:00Z"; //31 of february
    expect(formatDate(isoDataInvalide, "date")).toBe("02/03/2024"); //Possivel falso positivo
  });

  test("should not have AM or PM in hour", () => {
    const currentDateIso = new Date().toISOString();
    const formatHour = formatDate(currentDateIso, "hour");
    
    const containsAm = formatHour.includes("AM")
    const containsPm = formatHour.includes("PM")
    
    expect([containsAm, containsPm]).toStrictEqual([false, false])
  });
});
