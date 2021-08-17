import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const userProtoPath = join(__dirname, '../../modules/users/proto/user.proto');
const roleProtoPath = join(__dirname, '../../modules/roles/proto/role.proto');

const grpcConfig: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['users', 'roles'],
    protoPath: [userProtoPath, roleProtoPath],
  },
};

export default grpcConfig;
