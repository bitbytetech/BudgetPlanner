﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetPlannerApi.DB.Models.Address
{
    [Table("Countries")]
    public class Country
    {
        [Key]
        public int UniqueId { get; set; }
        public string Name { get; set; }
    }
}


