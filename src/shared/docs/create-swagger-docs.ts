import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export default (app): OpenAPIObject => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Users Microservice')
    .setDescription(
      'This microservice handles all data related to users, tenants and roles, also about user related stuff like address, phone number, CPF, and etc...',
    )
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  return document;
};
