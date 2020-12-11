import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import {
  AddTagDto,
  AddTodoDto,
  ExampleTodoAppOperations,
  GetUserDto,
  Todo,
  User,
} from '@nestql/example-domain';
import {
  createNestjsFastifyTestOperations,
  ITestOperation,
  ITestOperations,
  TestOperation,
} from '@nestql/nestjs';
import { UserRepository } from '../../app/repositories/user.repository';
import { AppTestModule } from '../core/app-test.module';
import { DatabaseService } from '../core/database.service';

class TestOperations implements ITestOperations<ExampleTodoAppOperations> {
  @TestOperation()
  getAllUsers!: ITestOperation<User[]>;

  @TestOperation()
  getUser!: ITestOperation<User, GetUserDto>;

  @TestOperation()
  addTodo!: ITestOperation<Todo, AddTodoDto>;

  @TestOperation()
  addTag!: ITestOperation<Todo, AddTagDto>;
}

describe('Todo Example App Operation Integration Tests', () => {
  let app: NestFastifyApplication;
  let operations: ITestOperations<ExampleTodoAppOperations>;

  let db: DatabaseService;
  let userRepo: UserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppTestModule],
      providers: [DatabaseService],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    operations = createNestjsFastifyTestOperations(app, TestOperations);

    db = moduleRef.get(DatabaseService);
    userRepo = moduleRef.get(UserRepository);

    await app.init();
  });

  beforeEach(async () => await db.clearDb());

  afterAll(async () => await app.close());

  describe('getAllUsers', () => {
    it('should initially return none', async () => {
      const { body } = await operations.getAllUsers({});
      expect(body.items.length).toBe(0);
    });

    describe('query tests', () => {
      let user: User;

      beforeEach(async () => {
        user = { id: '1', name: 'jomby', todos: [] };
        await userRepo.upsert(user, {});
      });

      it('full entity', async () => {
        const { body } = await operations.getAllUsers({ id: true, name: true, todos: {} });
        expect(user).toMatchObject(body.items[0]);
      });

      it('partial entity (id)', async () => {
        const partial = { ...user } as any;
        delete partial.id;

        const { body } = await operations.getAllUsers({ name: true, todos: {} });
        expect(partial).toMatchObject(body.items[0]);
      });

      it('partial entity (name)', async () => {
        const partial = { ...user } as any;
        delete partial.name;

        const { body } = await operations.getAllUsers({ id: true, todos: {} });
        expect(partial).toMatchObject(body.items[0]);
      });

      it('partial entity (todos)', async () => {
        const partial = { ...user } as any;
        delete partial.todos;

        const { body } = await operations.getAllUsers({ id: true, name: true });
        expect(partial).toMatchObject(body.items[0]);
      });

      it('empty entity', async () => {
        const { body } = await operations.getAllUsers({});
        expect({}).toMatchObject(body.items[0]);
      });
    });

    describe('pagination', () => {
      let user1: User;
      let user2: User;

      beforeEach(async () => {
        user1 = { id: '1', name: 'jomby', todos: [] };
        user2 = { id: '2', name: 'jomby2', todos: [] };
        await userRepo.upsertMany([user1, user2], {});
      });

      it('should pagination limit = 1', async () => {
        const { body } = await operations.getAllUsers({ __paginate: { __limit: 1, __page: 1 } });
        expect(body.items.length).toBe(1);
      });
      it('should pagination limit = 2', async () => {
        const { body } = await operations.getAllUsers({ __paginate: { __limit: 2, __page: 1 } });
        expect(body.items.length).toBe(2);
      });
    });
  });
});
