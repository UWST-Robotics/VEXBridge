export default abstract class Service {
    private readonly intervalDuration: number;
    private interval: NodeJS.Timeout | undefined;

    protected constructor(intervalDuration: number) {
        this.intervalDuration = intervalDuration;
    }

    /**
     * Updates the service. Called every `intervalDuration` milliseconds
     */
    abstract update(): void;

    /**
     * Checks if the service is alive
     * @returns {boolean} True if the service is alive
     */
    isAlive(): boolean {
        return this.interval !== undefined;
    }

    /**
     * Starts the service
     */
    start() {
        if (this.interval)
            clearInterval(this.interval);

        this.interval = setInterval(this.update.bind(this), this.intervalDuration);
    }
}