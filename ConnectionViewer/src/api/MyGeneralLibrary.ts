export class MyGeneralLibrary {
    /**
    * 新規 GUID を得る。
    * Get new GUID.
    */
    static getNewGuid(): string {
        function fourD() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return fourD() + fourD() + '-' + fourD() + '-' + fourD() + '-' + fourD() + '-' + fourD() + fourD() + fourD();
    }
}