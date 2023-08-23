const MAIN_LOG_COLOR = 'background:lightblue';
function flattenCategoricalOptionalityObjects() {
  const flat = flatten(everything);
  document.getElementById('bottom_right_textArea').value = JSON.stringify(
    flat,
    null,
    2
  );
}

function flattenTransformationModule_defaultCategorizedEvents() {
  const flat = flatten(transformationModule.defaultCategorizedEvents);
  document.getElementById('bottom_right_textArea').value = JSON.stringify(
    flat,
    null,
    2
  );
}

function inflateFlatMap(simple) {
  const complex = {};
  for (const key in simple) {
    const levels = key.split('.');
    let currLevelObj = complex;
    for (let i = 0; i < levels.length; i++) {
      const levelKey = levels[i];
      if (!currLevelObj.hasOwnProperty(levelKey)) {
        currLevelObj[levelKey] = {};
      }
      if (i === levels.length - 1) {
        currLevelObj[levelKey] = simple[key];
      }
      currLevelObj = currLevelObj[levelKey];
    }
  }
  return complex;
}

function createObjectToSend(event) {
  const ary_of_keys_to_send = Object.keys(event['default']['payload']);
  const sendThis = {};
  ary_of_keys_to_send.forEach((key) => {
    const x = lookup[key];
    sendThis[key] = x;
  });
  return sendThis;
}


function buildEventWhileIgnoringTheAutomaticallyGiven(flat_event_to_send) {
  let collector = {};
  const lam = flatten(everything['BASE_REQUIRED_LAM']['payload'], null, 2);
  for (let k in flat_event_to_send) {
    let isKeep = true;
    for (let k2 in lam) {
      if (k.startsWith(k2)) {
        isKeep = false;
      }
    }
    if (isKeep === true) {
      collector[k] = flat_event_to_send[k];
    }
  }
  return collector;
}

function reverseSortStringsOnLength(arr) {
  arr.sort(function (a, b) {
    return b.length - a.length;
  });
  return arr;
}

function upperCasify(aryOfStrings) {
  let result = [];
  aryOfStrings.forEach((thing) => {
    const pieces = thing.split('.');
    pieces[0] = pieces[0].toUpperCase();
    result.push(pieces.join('.'));
  });
  return result;
}
function superExpensiveMatch(flat_everything, array_of_almost_keys) {
  // Yes! This is crazy 'expensive'. But it is only 1 millisecond! So...
  let result = {};
  for (let keyWhichMightHaveQuestionMarks in flat_everything) {
    const candidate = keyWhichMightHaveQuestionMarks.replace(/\?/g, '');
    array_of_almost_keys.forEach((key) => {
      if (candidate === key) {
        result[candidate] = flat_everything[keyWhichMightHaveQuestionMarks];
      }
    });
  }
  return result;
}

function makeItRightShape(map, eventName) {
  // TODO: Talk with Shane and then remove this func.
  // This is part of the older 'everything automatic' idea
  if (eventName === 'error') {
    let errorObj = { error: {} };
    for (let k in map['EVENT']['attributes']) {
      const v = map['EVENT']['attributes'][k];
      errorObj['error'][k] = v;
    }
    return errorObj;
  } else if (eventName === 'general-component-event') {
    return map['EVENT'];
  } else if (eventName === 'product-interaction') {
    return map['EVENT'];
  } else if (eventName === 'purchase') {
    return map['EVENT']['attributes'];
  } else if (eventName === 'app-response') {
    return {
      event: {
        attributes: {
          details: 'this is optional details',
        },
      },
      id: 'this ID should be required',
    };
  } else if (eventName === 'page-products-displayed') {
    const productCollectionObject = {
      collectionList: [
        {
          id: 'pdp-recs-vertical-product-image',
          type: 'recommender',
          name: {
            unified: 'you-may-like',
            localized: 'You may like',
          },
          productList: [
            {
              categoryUnifiedId: 'somecategoryUnifiedId',
              unifiedId: 'someunifiedId',
              productId: 'abc123',
              skuList: [
                {
                  price: {
                    saleWithoutTaxShipping: '',
                    regularWithoutTaxShipping: '',
                    taxOnly: '',
                    isSale: false,
                    displaySale: '',
                    displayRegular: '',
                  },
                  quantity: -1,
                  size: 'small',
                  sku: 'sku123',
                },
              ],
            },
          ],
        },
      ],
    };

    return productCollectionObject;
  } else {
    return map;
  }
}

function log(msg) {
  console.log('%c' + msg, "background:lightgreen")
}

