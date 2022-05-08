using Dapper;

namespace TodoApi.Data;

public class DbInitializer
{
    private readonly IDbConnectionFactory _connectionFactory;

    public DbInitializer(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task InitializeAsync()
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        await connection.ExecuteAsync(
            @"CREATE TABLE IF NOT EXISTS messages (
	id serial4 NOT NULL,
	title text NOT NULL,
	body text NOT NULL,
	CONSTRAINT message_board_pk PRIMARY KEY (id)
);");
        await connection.ExecuteAsync(
            $@"CREATE TABLE IF NOT EXISTS users (
                                  id serial4 NOT NULL,
                        email text NOT NULL,
                        hash text NOT NULL,
                        CONSTRAINT users_pk PRIMARY KEY (id)
                                     );"
        );
        await connection.ExecuteAsync(
            $@"create table if not exists todo_lists (
	id serial4 not null,
	user_id serial4 not null,
	title text not null,
	constraint todo_lists_pk primary key (id),
	constraint todo_lists_fk foreign key (user_id) references users(id)
);"
        );

        await connection.ExecuteAsync(
            $@"CREATE TABLE IF NOT EXISTS todos (
	id serial4 NOT NULL,
	list_id int4 NOT NULL,
	todo text NOT NULL,
	CONSTRAINT todos_pk PRIMARY KEY (id),
	CONSTRAINT todos_fk FOREIGN KEY (list_id) REFERENCES todo_lists(id) ON DELETE CASCADE
);"
        );

        await connection.ExecuteAsync(
            $@"CREATE TABLE IF NOT EXISTS archived_todos (
	id serial4 NOT NULL,
	list_id int4 NOT NULL,
	archived text NOT NULL,
	CONSTRAINT archived_todos_pk PRIMARY KEY (id),
	CONSTRAINT archived_todos_fk FOREIGN KEY (list_id) REFERENCES todo_lists(id) ON DELETE CASCADE
);"
        );
    }
}