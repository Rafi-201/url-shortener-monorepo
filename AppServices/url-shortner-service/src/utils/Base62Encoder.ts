export class Base62Encoder {
  private static characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  static encode(num: number): string {
    let encoded = "";
    const base = this.characters.length;

    while (num > 0) {
      const remainder = num % base;
      encoded = this.characters[remainder] + encoded;
      num = Math.floor(num / base);
    }

    return encoded;
  }
}
