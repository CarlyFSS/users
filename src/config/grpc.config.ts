import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const tenantProtoPath = '../../modules/tenants/proto/tenant.proto';

const grpcConfig: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['tenants'],
    protoPath: [join(__dirname, tenantProtoPath)],
  },
};

export default grpcConfig;
