import { describe, it, expect } from "vitest";
import { ADDRESS, MAP_LINK, OPENING_HOURS, WHATSAPP, INSTAGRAM } from "@/components/site/data";

describe("Confirmed contact destinations", () => {
  it("opens the confirmed phone in WhatsApp", () => {
    expect(new URL(WHATSAPP()).pathname).toBe("/5521973233825");
  });
  it("opens the exact address in Google Maps", () => {
    expect(new URL(MAP_LINK("Android")).searchParams.get("query")).toBe("Av. Feliciano Sodré, 171 - Várzea, Teresópolis - RJ, 25963-083");
  });
  it("opens Apple Maps on Apple devices with the confirmed address", () => {
    const url = new URL(MAP_LINK("iPhone"));
    expect(url.hostname).toBe("maps.apple.com");
    expect(url.searchParams.get("q")).toContain(ADDRESS);
  });
  it("opens the confirmed Instagram profile", () => {
    expect(new URL(INSTAGRAM).pathname).toBe("/lavajatodotadeu");
  });
  it("uses the supplied Monday through Saturday hours", () => {
    expect(OPENING_HOURS.weekdays).toBe("07:00 – 17:00");
  });
  it("uses the supplied Sunday closing time rather than the directory time", () => {
    expect(OPENING_HOURS.sunday).toBe("07:00 – 14:00");
  });
});