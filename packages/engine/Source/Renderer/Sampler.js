import Check from "../Core/Check.js";
import defaultValue from "../Core/defaultValue.js";
import defined from "../Core/defined.js";
import DeveloperError from "../Core/DeveloperError.js";
import TextureMagnificationFilter from "./TextureMagnificationFilter.js";
import TextureMinificationFilter from "./TextureMinificationFilter.js";
import TextureWrap from "./TextureWrap.js";

/**
 * @private
 */
function Sampler(options) {
  options = defaultValue(options, defaultValue.EMPTY_OBJECT);

  const wrapS = defaultValue(options.wrapS, TextureWrap.CLAMP_TO_EDGE);
  const wrapT = defaultValue(options.wrapT, TextureWrap.CLAMP_TO_EDGE);
  const minificationFilter = defaultValue(
    options.minificationFilter,
    TextureMinificationFilter.LINEAR
  );
  const magnificationFilter = defaultValue(
    options.magnificationFilter,
    TextureMagnificationFilter.LINEAR
  );
  const maximumAnisotropy = defined(options.maximumAnisotropy)
    ? options.maximumAnisotropy
    : 1.0;

  //>>includeStart('debug', pragmas.debug);
  if (!TextureWrap.validate(wrapS)) {
    throw new DeveloperError("Invalid sampler.wrapS.");
  }

  if (!TextureWrap.validate(wrapT)) {
    throw new DeveloperError("Invalid sampler.wrapT.");
  }

  if (!TextureMinificationFilter.validate(minificationFilter)) {
    throw new DeveloperError("Invalid sampler.minificationFilter.");
  }

  if (!TextureMagnificationFilter.validate(magnificationFilter)) {
    throw new DeveloperError("Invalid sampler.magnificationFilter.");
  }

  Check.typeOf.number.greaterThanOrEquals(
    "maximumAnisotropy",
    maximumAnisotropy,
    1.0
  );
  //>>includeEnd('debug');

  this._wrapS = wrapS;
  this._wrapT = wrapT;
  this._minificationFilter = minificationFilter;
  this._magnificationFilter = magnificationFilter;
  this._maximumAnisotropy = maximumAnisotropy;
}

Object.defineProperties(Sampler.prototype, {
  wrapS: {
    get: function () {
      return this._wrapS;
    },
  },
  wrapT: {
    get: function () {
      return this._wrapT;
    },
  },
  minificationFilter: {
    get: function () {
      return this._minificationFilter;
    },
  },
  magnificationFilter: {
    get: function () {
      return this._magnificationFilter;
    },
  },
  maximumAnisotropy: {
    get: function () {
      return this._maximumAnisotropy;
    },
  },
});

Sampler.equals = function (left, right) {
  return (
    left === right ||
    (defined(left) &&
      defined(right) &&
      left._wrapS === right._wrapS &&
      left._wrapT === right._wrapT &&
      left._minificationFilter === right._minificationFilter &&
      left._magnificationFilter === right._magnificationFilter &&
      left._maximumAnisotropy === right._maximumAnisotropy)
  );
};

Sampler.NEAREST = Object.freeze(
  new Sampler({
    wrapS: this.wrapS,
    wrapT: this.wrapT,
    minificationFilter: TextureMinificationFilter.NEAREST,
    magnificationFilter: TextureMagnificationFilter.NEAREST,
  })
);
export default Sampler;
