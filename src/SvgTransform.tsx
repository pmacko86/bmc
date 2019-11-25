import * as math from "mathjs";


/**
 * Point coordinates.
 */
type XY = {
  x: number;
  y: number;
}


/**
 * Class representing SVG transform.
 *
 * All instances of this class are immutable.
 */
export default class SvgTransform {
  matrix: math.Matrix;


  /**
   * Create a new instance of the class.
   *
   * @param [math.Matrix] the 3x3 transform matrix.
   */
  constructor(matrix?: math.Matrix) {
    if (matrix) {
      this.matrix = matrix;
    }
    else {
      this.matrix = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]], "dense");
    }
  }


  /**
   * Create the class from a translation transform.
   *
   * @param [number] x the X delta
   * @param [number] y the Y delta
   * @return [SvgTransform] the transform
   */
  static fromTranslate(x: number, y: number): SvgTransform {
    let m = math.matrix([[1, 0, x], [0, 1, y], [0, 0, 1]], "dense");
    return new SvgTransform(m);
  }


  /**
   * Create the class from a scale transform.
   *
   * @param [number] x the X scale (or the overall scale if y is undefined)
   * @param [number] y the Y scale
   * @return [SvgTransform] the transform
   */
  static fromScale(x: number, y?: number): SvgTransform {
    let yy = y === undefined ? x : y;
    let m = math.matrix([[x, 0, 0], [0, yy, 0], [0, 0, 1]], "dense");
    return new SvgTransform(m);
  }


  /**
   * Clone the object.
   *
   * @return [SvgTransform] the cloned object
   */
  clone(): SvgTransform {
    let m = this.matrix;
    return new SvgTransform(m);
  }


  /**
   * Combine with another transform.
   *
   * @param [SvgTransform | null] second the other transform
   * @return [SvgTransform] the combined transform
   */
  then(second?: SvgTransform | null) {
    if (second === undefined || second === null) return this.clone();
    let m = math.multiply(second.matrix, this.matrix) as math.Matrix;
    return new SvgTransform(m);
  }


  /**
   * Apply the transform.
   *
   * @param [XY] x the input vector.
   * @return [XY] the output vector.
   */
  apply(x: XY): XY;


  /**
   * Apply the transform.
   *
   * @param [number] x the X coordinate of the input vector.
   * @param [number] y the Y coordinate of the input vector.
   * @return [XY] the output vector.
   */
  apply(x: number, y: number): XY;


  /**
   * Apply the transform.
   *
   * @param [XY | number] p0 the vector or the X coordinate
   * @param [number] p1 the Y coordinate
   * @return [XY] the output vector.
   */
  apply(p0: XY | number, p1?: number): XY {

    let x, y;
    if (typeof p0 === "number" && typeof p1 === "number") {
      x = p0;
      y = p1;
    }
    else if (typeof p0 === "object") {
      x = (p0 as XY).x;
      y = (p0 as XY).y;
    }
    else {
      x = 0;
      y = 0;
    }

    let v = math.matrix([[x], [y], [1]]);
    let r = math.multiply(this.matrix, v) as math.Matrix;
    let p = { x: r.get([0, 0]), y: r.get([1, 0]) };
    return p;
  }


  /**
   * Parse the transform from a string, ignoring all errors.
   *
   * @param [string] s the string.
   * @return [SvgTransform] the transform.
   */
  static parse(s: string): SvgTransform {
    let r = new SvgTransform();
    let parts = s.split(/\)[^a-zA-Z0-9]*/);
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === "") continue;
      let [fn, t] = parts[i].split("(", 2);
      let params = t.split(/ +/);
      if (fn === "translate" && params.length === 2) {
        let x = parseFloat(params[0]);
        let y = parseFloat(params[1]);
        r = r.then(SvgTransform.fromTranslate(x, y));
      }
      if (fn === "scale" && params.length === 1) {
        let x = parseFloat(params[0]);
        r = r.then(SvgTransform.fromScale(x, x));
      }
      if (fn === "scale" && params.length === 2) {
        let x = parseFloat(params[0]);
        let y = parseFloat(params[1]);
        r = r.then(SvgTransform.fromScale(x, y));
      }
    }
    return r;
  }
}
