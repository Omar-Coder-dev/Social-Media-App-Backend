import { DeleteResult, HydratedDocument, Model, MongooseUpdateQueryOptions, ProjectionType, QueryFilter, QueryOptions, Types, UpdateQuery, UpdateWriteOpResult } from "mongoose";


export class DBRepo<TDocument> {
    constructor(private model: Model<TDocument>) { }

    async findById(
        id: Types.ObjectId | string,
        projection?: ProjectionType<TDocument>,
        options?: QueryOptions
    ): Promise<HydratedDocument<TDocument> | null> {
        const doc = await this.model.findById(id, projection, options);
        return doc;
    }

    async find(
        filter: QueryFilter<TDocument>,
        projection?: ProjectionType<TDocument>,
        options?: QueryOptions
    ): Promise<HydratedDocument<TDocument>[]> {
        const docs = await this.model.find(filter, projection, options);
        return docs;
    }
    async findOne(
        filter: QueryFilter<TDocument>,
        projection?: ProjectionType<TDocument>,
        options?: QueryOptions
    ): Promise<HydratedDocument<TDocument> | null> {
        const doc = await this.model.findOne(filter, projection, options);
        return doc;
    }

    async create(
        data: Partial<TDocument> | Array<Partial<TDocument>>
    ): Promise<HydratedDocument<TDocument> | HydratedDocument<TDocument>[]> {
        let docs;
        if (Array.isArray(data)) {
            docs = await this.model.create(data);
            return docs;
        } else {
            docs = await this.model.create(data);
            return docs;
        }
    }
    async updateOne(
        filter: QueryFilter <TDocument>,
        update: UpdateQuery<TDocument>,
        options?: MongooseUpdateQueryOptions<TDocument>
    ): Promise<UpdateWriteOpResult> {
        const result = await this.model.updateOne(filter, update, options);
        return result;
    }

    async updateMany(
        filter: QueryFilter<TDocument>,
        update: UpdateQuery<TDocument>,
        options?: MongooseUpdateQueryOptions<TDocument>
    ): Promise<UpdateWriteOpResult> {
        const result = await this.model.updateMany(filter, update, options);
        return result;
    }
    async findOneAndUpdate(
        filter: QueryFilter<TDocument>,
        update: UpdateQuery<TDocument>,
        options?: QueryOptions<TDocument>
    ): Promise<HydratedDocument<TDocument> | null> {
        const doc = await this.model.findOneAndUpdate(filter, update, options);
        return doc;
    }
    async findByIdAndUpdate(
        id: Types.ObjectId | string,
        update: UpdateQuery<TDocument>,
        options?: QueryOptions<TDocument>
    ): Promise<HydratedDocument<TDocument> | null> {
        const doc = await this.model.findByIdAndUpdate(id, update, options);
        return doc;
    }
    async findOneAndDelete(
        filter: QueryFilter<TDocument>,
        options?: QueryOptions<TDocument>
    ): Promise<HydratedDocument<TDocument> | null> {
        const doc = await this.model.findOneAndDelete(filter, options)
        return doc
    }

    async findByIdAndDelete(
        id: Types.ObjectId | string,
        options?: QueryOptions<TDocument>
    ): Promise<HydratedDocument<TDocument> | null> {
        const doc = await this.model.findByIdAndDelete(id, options)
        return doc
    }

async deleteOne(
        filter: QueryFilter<TDocument>,
        options: MongooseUpdateQueryOptions<TDocument>
    ): Promise<DeleteResult> {
        const result = await this.model.deleteOne(filter, options)
        return result
    }

    async deleteMany(
        filter: QueryFilter<TDocument>,
        options: MongooseUpdateQueryOptions<TDocument>
    ): Promise<DeleteResult> {
        const result = await this.model.deleteMany(filter, options)
        return result
    }
}