'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prev = { ...state };
  const history = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      prev = {};
    } else if (action.type === 'addProperties') {
      prev = { ...prev, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const remover = { ...prev };

      for (const key of action.keysToRemove) {
        delete remover[key];
      }
      prev = remover;
    }

    history.push(prev);
  }

  return history;
}

module.exports = transformStateWithClones;
