export class CreateClientController {
    constructor(createClientUseCase) {
        this.createClientUseCase = createClientUseCase;
    }
    async handle(req, res) {
        try {
            const { name, email, phone, password, dateOfBirth, weight } = req.body;
            const client = await this.createClientUseCase.execute({
                name,
                email,
                phone,
                password,
                dateOfBirth: new Date(dateOfBirth),
                weight: Number(weight),
            });
            return res.status(201).json(client);
        }
        catch (error) {
            return res.status(400).json({ message: 'Error creating client' });
        }
    }
}
