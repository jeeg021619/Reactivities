using System;
using System.Security.Cryptography.X509Certificates;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>>
    { 
        public required string Id { get; set; } 
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
           var activity = await context.Activities.FindAsync([request.Id], cancellationToken: cancellationToken);

        if (activity == null) return Result<Unit>.Failure("Could not find activity", 404);
           context.Remove(activity);
           var result = await context.SaveChangesAsync(cancellationToken) > 0;

           if(!result) return Result<Unit>.Failure("Failed to delete activity", 400);

           return Result<Unit>.Success(Unit.Value);
        }
    }
}
