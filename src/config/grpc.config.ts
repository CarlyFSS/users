import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const tenantProtoPath = join(
  __dirname,
  '../../modules/tenants/proto/tenant.proto',
);
const roleProtoPath = join(__dirname, '../../modules/roles/proto/role.proto');

const grpcConfig: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['tenants', 'roles'],
    protoPath: [tenantProtoPath, roleProtoPath],
  },
};

export default grpcConfig;
