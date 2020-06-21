module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@services': './src/Services',
        '@models': './src/Models',
        '@controllers': './src/Controllers',
        '@database': './src/Database'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
