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
        '@controllers': './src/controllers/controller.ts',
        "@controller/*": "./src/controllers/*",
        '@database': './src/Database',
        "@libUtc": "./src/libs/date-time-utc.ts",
        '@models': './src/models/models.ts',
        '@model/*': './src/models/*',
        '@services': './src/services/services.ts',
        "@service/*": "./src/services/*",
        "@routes": "./src/routes/routes.ts"
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
