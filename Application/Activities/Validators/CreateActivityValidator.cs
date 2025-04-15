using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidator : BaseActiivtyValidator<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidator() : base (x => x.ActivityDto)
    {
       
    }
}
