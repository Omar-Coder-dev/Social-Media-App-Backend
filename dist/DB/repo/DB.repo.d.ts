import { DeleteResult, HydratedDocument, Model, MongooseUpdateQueryOptions, ProjectionType, QueryFilter, QueryOptions, Types, UpdateQuery, UpdateWriteOpResult } from "mongoose";
export declare class DBRepo<TDocument> {
    private model;
    constructor(model: Model<TDocument>);
    create(data: Partial<TDocument>): Promise<HydratedDocument<TDocument>>;
    createMany(data: Partial<TDocument>[]): Promise<HydratedDocument<TDocument>[]>;
    findById(id: Types.ObjectId | string, projection?: ProjectionType<TDocument>, options?: QueryOptions): Promise<HydratedDocument<TDocument> | null>;
    find(filter: QueryFilter<TDocument>, projection?: ProjectionType<TDocument>, options?: QueryOptions): Promise<HydratedDocument<TDocument>[]>;
    findOne(filter: QueryFilter<TDocument>, projection?: ProjectionType<TDocument>, options?: QueryOptions): Promise<HydratedDocument<TDocument> | null>;
    updateOne(filter: QueryFilter<TDocument>, update: UpdateQuery<TDocument>, options?: MongooseUpdateQueryOptions<TDocument>): Promise<UpdateWriteOpResult>;
    updateMany(filter: QueryFilter<TDocument>, update: UpdateQuery<TDocument>, options?: MongooseUpdateQueryOptions<TDocument>): Promise<UpdateWriteOpResult>;
    findOneAndUpdate(filter: QueryFilter<TDocument>, update: UpdateQuery<TDocument>, options?: QueryOptions<TDocument>): Promise<HydratedDocument<TDocument> | null>;
    findByIdAndUpdate(id: Types.ObjectId | string, update: UpdateQuery<TDocument>, options?: QueryOptions<TDocument>): Promise<HydratedDocument<TDocument> | null>;
    findOneAndDelete(filter: QueryFilter<TDocument>, options?: QueryOptions<TDocument>): Promise<HydratedDocument<TDocument> | null>;
    findByIdAndDelete(id: Types.ObjectId | string, options?: QueryOptions<TDocument>): Promise<HydratedDocument<TDocument> | null>;
    deleteOne(filter: QueryFilter<TDocument>, options?: Parameters<typeof this.model.deleteOne>[1]): Promise<DeleteResult>;
    deleteMany(filter: QueryFilter<TDocument>, options?: Parameters<typeof this.model.deleteMany>[1]): Promise<DeleteResult>;
}
//# sourceMappingURL=DB.repo.d.ts.map