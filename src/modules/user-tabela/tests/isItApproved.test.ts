import { test, describe, expect } from "vitest";
import isItApproved from "../utils/isItApproved";

describe("Test the is It Approved function", () => {
  test("should not return a msg without send a paramter", () => {
    const msg = isItApproved();
    expect(msg).toBe("-");
  });

  test("should not return a msg with a parameter different of boolean", () => {
    const msgOne = isItApproved([]);
    const msgTwo = isItApproved({});
    const msgThr = isItApproved("");
    const msgFor = isItApproved(27);
    const msgFiv = isItApproved(null);
    const msgSix = isItApproved(undefined);

    expect([msgOne, msgTwo, msgThr, msgFor, msgFiv, msgSix]).toStrictEqual([
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ]);
  });

  test("should return yes and no", () => {
    const msgs = [isItApproved(true), isItApproved(false)];
    expect(msgs).toStrictEqual(["Sim", "Não"]);
  });
});
