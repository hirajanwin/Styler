import { CMD } from './modules/globals';
import { changeAllStyles, extractAllStyles } from './modules/styles';

(function main() {
  figma.showUI(__html__, { visible: false });

  if (CMD === 'customize-plugin') {
    figma.showUI(__html__, { width: 400, height: 400 });
  }

  // creating layers based on styles
  else if (CMD === 'extract-all-styles') {
    extractAllStyles();
  }

  // changing styles based on layer selection
  else {
    changeAllStyles();
  }
})();
