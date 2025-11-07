export default interface UseCase<inp, out> {
    execute(input: inp): Promise<out>
}