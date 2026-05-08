"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBRepo = void 0;
class DBRepo {
    model;
    constructor(model) {
        this.model = model;
    }
    async findById(id, projection, options) {
        const doc = await this.model.findById(id, projection, options);
        return doc;
    }
    async find(filter, projection, options) {
        const docs = await this.model.find(filter, projection, options);
        return docs;
    }
    async findOne(filter, projection, options) {
        const doc = await this.model.findOne(filter, projection, options);
        return doc;
    }
    async create(data) {
        let docs;
        if (Array.isArray(data)) {
            docs = await this.model.create(data);
            return docs;
        }
        else {
            docs = await this.model.create(data);
            return docs;
        }
    }
    async updateOne(filter, update, options) {
        const result = await this.model.updateOne(filter, update, options);
        return result;
    }
    async updateMany(filter, update, options) {
        const result = await this.model.updateMany(filter, update, options);
        return result;
    }
    async findOneAndUpdate(filter, update, options) {
        const doc = await this.model.findOneAndUpdate(filter, update, options);
        return doc;
    }
    async findByIdAndUpdate(id, update, options) {
        const doc = await this.model.findByIdAndUpdate(id, update, options);
        return doc;
    }
    async findOneAndDelete(filter, options) {
        const doc = await this.model.findOneAndDelete(filter, options);
        return doc;
    }
    async findByIdAndDelete(id, options) {
        const doc = await this.model.findByIdAndDelete(id, options);
        return doc;
    }
    async deleteOne(filter, options) {
        const result = await this.model.deleteOne(filter, options);
        return result;
    }
    async deleteMany(filter, options) {
        const result = await this.model.deleteMany(filter, options);
        return result;
    }
}
exports.DBRepo = DBRepo;
//# sourceMappingURL=DB.repo.js.map