import * as fs from 'fs/promises';
import fetch from 'node-fetch';
export class SessionManager {
    constructor() {
    }
    async LoadSecret(path) {
        let secretFile = (await fs.readFile(path)).toString();
        let secretJson = JSON.parse(secretFile);
        this.ProjectID = secretJson.project_id;
        this.ClientID = secretJson.client_id;
        this.ClientSecret = secretJson.client_secret;
        this.RedirectURL = secretJson.redirect_url;
        if (secretJson.refresh_token != '') {
            this.RefreshToken = secretJson.refresh_token;
        }
    }
    get AuthURL() {
        return `https://nestservices.google.com/partnerconnections/${this.ProjectID}/auth?redirect_uri=${this.RedirectURL}&access_type=offline&prompt=consent&client_id=${this.ClientID}&response_type=code&scope=https://www.googleapis.com/auth/sdm.service`;
    }
    async ObtainToken(ac) {
        let params = {
            "client_id": this.ClientID,
            "client_secret": this.ClientSecret,
            "code": ac,
            "grant_type": "authorization_code",
            "redirect_uri": this.RedirectURL
        };
        let response = await fetch(decodeURIComponent("https://www.googleapis.com/oauth2/v4/token?" + new URLSearchParams(params)), {
            method: "POST",
        });
        let responseJson = (await response.json());
        this.AccessToken = `${responseJson.token_type} ${responseJson.access_token}`;
        this.RefreshToken = responseJson.refresh_token;
    }
    async Refresh() {
        let params = {
            "client_id": this.ClientID,
            "client_secret": this.ClientSecret,
            "grant_type": "refresh_token",
            "refresh_token": this.RefreshToken
        };
        let response = await fetch(decodeURIComponent("https://www.googleapis.com/oauth2/v4/token?" + new URLSearchParams(params)), {
            method: "POST",
        });
        let responseJson = (await response.json());
        this.AccessToken = `${responseJson.token_type} ${responseJson.access_token}`;
    }
}
//# sourceMappingURL=SessionManager.js.map