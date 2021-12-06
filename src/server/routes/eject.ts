import { Request, Response } from "express";

export function erase({ end, url }) {
  end(url);
}
