interface IService<T> {
    loadAll() : Promise<T[]>
    loadOne(id: number) : Promise<T>
    update(value: T) : Promise<void>
    create(value: T): Promise<void>
    delete(id: number) : Promise<void>
}

export default IService;