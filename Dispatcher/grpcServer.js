import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
import { order } from './controllers/userController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, 'dispatcher.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const dispatcherProto = grpc.loadPackageDefinition(packageDefinition).dispatcher;

const DispatcherService = {
    OrderDispatcher: async (call, callback) => {
        try {
            const req = { body: call.request };
            const res = {
                json: (data) => {
                    callback(null, {
                        _id: data._id,
                        pointA: data.dress,
                        pointB: data.material,
                        price: data.price,
                        products: data.date
                    });
                },
                status: (statusCode) => ({
                    json: (data) => callback({
                        code: grpc.status.INTERNAL,
                        message: data.message,
                    })
                }),
            };
            await order(req, res);
        } catch (error) {
            console.error(error);
            callback({
                code: grpc.status.INTERNAL,
                message: 'Error creating order',
            });
        }
    },
};

function startGrpcServer() {
    const server = new grpc.Server();
    server.addService(dispatcherProto.DispatcherService.service, DispatcherService);
    server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
        console.log('gRPC server running at http://127.0.0.1:50051');
        server.start();
    });
}

export default startGrpcServer;
