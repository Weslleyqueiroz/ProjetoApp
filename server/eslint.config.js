import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

import pluginReact from "eslint-plugin-react";

import pluginReactHooks from "eslint-plugin-react-hooks";

export default defineConfig([

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    languageOptions: {
      globals: globals.node,
    
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true }, 
      },
    },
    
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },

    rules: {
   
      ...pluginReact.configs.recommended.rules,
      
   
      ...pluginReactHooks.configs.recommended.rules,
      
    
      "react/jsx-uses-react": "off", 
      "react/react-in-jsx-scope": "off", 
    },
  },
  

  ...tseslint.configs.recommended,
  

  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  
 
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
]);