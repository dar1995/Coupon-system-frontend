class UrlService {
    private port = 8080;
    private baseUrl = `http://localhost:${this.port}`;
    public user = this.baseUrl + "/api/user";
    public auth = this.baseUrl + "/api/auth";
    public admin = this.baseUrl + "/api/admin";
    public company = this.baseUrl + "/api/company";
    public customer = this.baseUrl + "/api/customer";

}
const urlService = new UrlService;
export default urlService;