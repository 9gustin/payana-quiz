import { vi, expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { MOCK_QUIZ } from "../src/services/mocks";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

vi.mock(
  "react-query",
  vi.fn(() => ({
    useQuery: vi.fn(() => ({
      data: MOCK_QUIZ,
    })),
  }))
);
