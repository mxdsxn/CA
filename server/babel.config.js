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
        '@controllers': './src/controllers/index.ts',
        "@controller/*": "./src/controllers/*",
        '@database': './src/Database',
        "@libUtc": "./src/libs/date-time-utc.ts",
        '@models': './src/models/index.ts',
        '@model/*': './src/models/*',
        '@services': './src/services/index.ts',
        "@service/*": "./src/services/*",
        '@entities': './src/entities/index.ts',
        "@entity/*": "./src/entities/*",
        "@routes": "./src/routes/routes.ts"
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
