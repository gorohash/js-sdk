import { KintoneAPIClient } from "../KintoneAPIClient";
import { Base64 } from "js-base64";

describe("KintoneAPIClient", () => {
  let originalKintone: any;
  beforeEach(() => {
    originalKintone =
      typeof global.kintone !== "undefined" ? global.kintone : undefined;
    global.kintone = {
      getRequestToken: () => "dummy request token"
    };
  });
  afterEach(() => {
    global.kintone = originalKintone;
  });
  describe("constructor", () => {
    describe("Header", () => {
      const host = "https://example.com";
      it("ApiToken auth", () => {
        const API_TOKEN = "ApiToken";
        const auth = {
          apiToken: API_TOKEN
        };
        const client = new KintoneAPIClient({ host, auth });
        expect(client.getHeaders()).toEqual({
          "X-Cybozu-API-Token": API_TOKEN
        });
      });
      it("ApiToken auth using multiple tokens as comma-separated string", () => {
        const API_TOKEN1 = "ApiToken1";
        const API_TOKEN2 = "ApiToken2";
        const auth = {
          apiToken: `${API_TOKEN1},${API_TOKEN2}`
        };
        const client = new KintoneAPIClient({ host, auth });
        expect(client.getHeaders()).toEqual({
          "X-Cybozu-API-Token": `${API_TOKEN1},${API_TOKEN2}`
        });
      });
      it("ApiToken auth using multiple tokens as array", () => {
        const API_TOKEN1 = "ApiToken1";
        const API_TOKEN2 = "ApiToken2";
        const auth = {
          apiToken: [API_TOKEN1, API_TOKEN2]
        };
        const client = new KintoneAPIClient({ host, auth });
        expect(client.getHeaders()).toEqual({
          "X-Cybozu-API-Token": `${API_TOKEN1},${API_TOKEN2}`
        });
      });
      it("Password  auth", () => {
        const USERNAME = "user";
        const PASSWORD = "password";
        const auth = {
          username: USERNAME,
          password: PASSWORD
        };
        const client = new KintoneAPIClient({ host, auth });
        expect(client.getHeaders()).toEqual({
          "X-Cybozu-Authorization": Base64.encode(`${USERNAME}:${PASSWORD}`)
        });
      });
      it("Session auth", () => {
        const auth = {};
        const client = new KintoneAPIClient({ host, auth });
        expect(client.getHeaders()).toEqual({
          "X-Requested-With": "XMLHttpRequest"
        });
      });
    });
  });
});