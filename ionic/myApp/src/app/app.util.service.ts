import {Injectable} from "@angular/core";
@Injectable()
export class UtilService{
  /**
   * 对字符串加密
   * @param str
   * @returns {string}
   */
    public encodeString(str){
      let length = str.length;
      let code = '';
      for(let i = 0;i < length;i ++){
        code += String.fromCharCode(str.charCodeAt(i) + (i - length));
      }
      return code;
  }

  /**
   * 对字符串解密
   * @param code
   * @returns {string}
   *
   */
  public decodeString(code){
    let length = code.length;
    let str   = '';
    for(let i = 0;i < length;i ++){
      str += String.fromCharCode(code.charCodeAt(i) + (i - length));
    }
    return str;
  }

}
